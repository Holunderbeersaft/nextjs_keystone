import type { NextPage } from 'next'
import { useState, useEffect } from "react"
import Link from 'next/link'
import { Page } from "../components/Page"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthenticateUserMutation, useCreateUserMutation } from '../generated/graphql'
import { useAuthenticateQuery } from '../generated/graphql'
import { useUser } from "../hooks/User"


type FormValues = {
  firstName: string;
  email: string;
  password: string;
  terms: boolean;
};

const schema = yup.object().shape({
  firstName: yup.string().required("Firstname field is required"),
  email: yup.string().email("Provided Email is not a valid Email adress").required("Email field is required"),
  password: yup.string().min(8, "Minimum length is 8 characters").required("Password field is required"),
  terms: yup.boolean().oneOf([true], "Please accept our terms")
}).required();


const Home: NextPage = () => {
  const [foundErrors, setFoundErrors] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const [updateUserResult, updateCreateUser] = useCreateUserMutation();
  const [updateAuthResult, updateAuthenticateUser] = useAuthenticateUserMutation();
  // const userID = useUser();
  const [{ data: userID }, reexecuteQuery] = useAuthenticateQuery();





  // check to see if the user has an existing session and has already been authenticated
  // Adding this here instead of onCompletion so that if the user comes, they can get where they need to go
  useEffect(() => {
    console.log("checking the user")
    console.log(userID);

  }, [userID])

  const onSubmit: SubmitHandler<FormValues> = data => {
    //freeze our form on submitting
    setSubmittingForm(true);

    signupUser(data)

    //enable our form again
    setSubmittingForm(false)
  };


  // create the user
  const signupUser = async (data: any) => {
    try {
      const result = await updateCreateUser({
        "data": {
          "name": data.firstName,
          "email": data.email,
          "password": data.password
        }
      })
      if (result.error) {
        throw new Error("Error found");
      }

      // console.log("result", updateUserResult)
      await authenticateUser(data);
      await authUser();

    }
    catch {
      // error handling auth/signup
      setFoundErrors(true);
    }

  }

  const authUser = async () => {
    reexecuteQuery({ requestPolicy: 'network-only' });
    console.log("userID", userID)
  }

  // authenticate the user if they are successfully created using the credentials they provided
  const authenticateUser = async (data: any) => {
    try {
      const loggedInUser = await updateAuthenticateUser({
        "email": data.email,
        "password": data.password
      }
      )
      // console.log("loggedInUser", loggedInUser.data?.authenticateUserWithPassword?.sessionToken)

      const sesToken = loggedInUser.data?.authenticateUserWithPassword?.sessionToken;

      if (sesToken) {
        // Create an item in local storage with their session information
        localStorage.setItem('token', sesToken)
      }

    }
    catch {
      setFoundErrors(true)
    }
    // if successful, then send the user to the directions page

  }



  return (
    <Page>
      <div className="box">
        {/* heading */}
        <h1 className='page-title'>
          <span className='font-semibold'>Mood</span>Tracker
        </h1>
        <h2 className="font-sans font-semibold uppercase tracking-wider text-primary text-lg mb-4">Create an Account</h2>

        {foundErrors && (
          <div className='error'>Whoops! We found some errors.</div>
        )}

        {/* form */}
        {/* <form className='relative lg:grid grid-cols-3 gap-x-4'> */}
        <form onSubmit={handleSubmit(onSubmit)} className='relative'>

          <fieldset className='lg:grid grid-cols-3 gap-x-4' disabled={submittingForm}>
            <div className='mb-4 lg:mb-0'>
              <label htmlFor="firstName">First Name</label>
              <input type="text" {...register("firstName")} />
              {/* <input type="text" /> */}
              {errors?.firstName && <div className='error'>{errors.firstName?.message}</div>}
            </div>
            <div className='mb-4 lg:mb-0'>
              <label htmlFor="email">Email Adress</label>
              <input type="email" {...register("email")} />
              {/* <input type="email" /> */}
              {errors?.email && <div className='error'>{errors.email?.message}</div>}
            </div>
            <div className='mb-4 lg:mb-0'>
              <label htmlFor="password">Password</label>
              <input type="password" {...register("password")} />
              {/* <input type="password" /> */}
              {errors?.password && <div className='error'>{errors.password?.message}</div>}
            </div>
            <div className='flex justify-self-end self-end col-span-2 mb-4 lg:mb-0'>
              <input type="checkbox" id="terms" className='mr-2' {...register("terms")} />
              {/* <input type="checkbox" id="terms" className='mr-2' /> */}
              <label htmlFor="terms">I agree to your <Link href="/terms-and-conditions">terms and conditions</Link></label>
              {errors?.terms && <div className='error'>{errors.terms?.message}</div>}
            </div>
          </fieldset>

          <button type='submit' role="submit" className='col-span-1 justify-self-end lg:w-full mt-4 button'>
            <span className='button-text'>Submit</span>
          </button>
          <div className='left-0 absolute -bottom-16 text-sm text-gray-600'>
            <Link href="/what-is">What is the Mood tracker?</Link>
          </div>
        </form>
      </div>
    </Page>
  )
}

export default Home
