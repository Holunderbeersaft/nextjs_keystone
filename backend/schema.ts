/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { config, list } from '@keystone-6/core';
import format from 'date-fns/format'

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  select,
  integer,
  calendarDay
} from '@keystone-6/core/fields';
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from '@keystone-6/fields-document';

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types';

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // ==== ==== ==== USER === === ===
  User: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true } }),
      moods: relationship({ ref: 'Mood.user', many: true })

    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'id'],
      },
    },
  }),
  // ==== ==== ==== QUSTION ==== ==== ====
  Question: list({
    fields: {
      questionMood: text({ validation: { isRequired: true } }),
      questionThing: text({ validation: { isRequired: true } }),
      // mood: relationship({ ref: 'Mood.question' })
    }
  }),
  // ==== ==== ==== Mood ==== ==== ====
  Mood: list({
    fields: {
      mood: select({
        type: 'integer',
        options: [
          { label: 'Happy', value: 128522 },
          { label: 'Good', value: 128578 },
          { label: 'Ok', value: 128528 },
          { label: 'Bad', value: 128577 },
          { label: 'Horrible', value: 128555 },
        ],
        validation: { isRequired: true }
      }),
      thing: text({ ui: { displayMode: 'textarea' } }),
      date: calendarDay({ validation: { isRequired: true } }),
      user: relationship({ ref: 'User.moods' })
    },
    hooks: {
      // Dynamic default: Find current logged in user and assign the task to them
      async resolveInput({ context, resolvedData, item, inputData, operation }) {

        // If user is not assigned on creation assign mood to current sessionid user
        if (operation === "create" && !resolvedData.user && context.session) {
          return { ...resolvedData, user: { connect: { id: context.session.itemId } } };
        }
        // If user is not assigned on updating any value assign mood to current sessionid user
        if (operation === "update" && resolvedData.user?.disconnect && context.session) {
          return { ...resolvedData, user: { connect: { id: context.session.itemId } } };
        }
        // Otherwise just return updated data
        return resolvedData;
      },
      // Check if date for this user already exists, if yes throw error
      async validateInput({ resolvedData, item, context, operation, addValidationError }) {

        // On create check if selected or session assigned user already has that date
        if (operation === 'create') {
          const dateCount = await context.db.Mood.count({
            where: { date: { equals: resolvedData.date }, user: { id: { equals: resolvedData.user.connect.id } } },
          });
          if (dateCount) {
            addValidationError('Mood entry for this user and date already exists!')
          }
        }
        // On update check if selected or session assigned user already has that date
        if (operation === 'update') {
          // Same user with another date
          if ((!resolvedData.user || resolvedData.user?.connect?.id === item.userId) && resolvedData.date) {
            console.log("gleicher Nutzer, anderes Datum");
            const dateCount = await context.db.Mood.count({
              where: { date: { equals: resolvedData.date }, user: { id: { equals: item.userId } } },
            });
            if (dateCount) {
              addValidationError('Mood entry for this user and date already exists!')
            }
          }
          // Another User with another date
          if ((resolvedData.user && resolvedData.user?.connect?.id !== item.userId) && resolvedData.date) {
            console.log("anderer Nutzer, anderes Datum")
            const dateCounttwo = await context.db.Mood.count({
              where: { date: { equals: resolvedData.date }, user: { id: { equals: resolvedData.user.connect.id } } },
            });
            if (dateCounttwo) {
              addValidationError('Mood entry for this user and date already exists!')
            }
          }
          // Another User with same date
          if ((resolvedData.user && resolvedData.user?.connect?.id !== item.userId) && !resolvedData.date) {
            const dateCountthree = await context.db.Mood.count({
              where: { date: { equals: item.date }, user: { id: { equals: resolvedData.user.connect.id } } },
            });
            if (dateCountthree) {
              addValidationError('Mood entry for this user and date already exists!')
            }
          }

        }

      }
    },
  }),

};
