# Code Challenge: GitHub repository finder

The goal of this challenge is to build a GitHub repository finder app.
Please use the GitHub GraphQL API Endpoint with the Apollo Client.
To prevent you from wasting time to setup the environment: we use Create React App.
You only have to insert your [GitHub Authentication Token](https://github.com/settings/tokens/new) in `App.js#11` You can start the app with `npm start`.

https://developer.github.com/v4/

If you have any questions, don't hesitate to ask. You don't have to complete all steps. Have fun! We are curious to see your result.

## Step 1

Add a search field. The user uses this field to search for a repository. Depending on the query, the app suggests possible repositories (name).

## Step 2

Upon confirmation, the repository should be added to a card view with following information:

* name
* owner with name and picture
* forkCount, watchers, stargazers

## Step 3

It would be great if the app has loading states.

## Step 4

Add the possibility to delete a card.

## Step 5

Save the repository selection so that the user can see the previous selection next time.


## stretch Goals
* pagination for dropdown list
* links from card to github
* toggle list onChange, instead of on button click
* figure out why dotenv isnt working
