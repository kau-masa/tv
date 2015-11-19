# Small example with a tv #

1. Install [node js](https://nodejs.org/en/)
2. Install all dependencies

````
npm install
````

3. Set your application secret and project references in `src/constants.js`, the following variables needs to be set - `SH_APP_ID` and `SH_APP_SECRET` that can be retrieved in the craft ai workbench in `craft_project.json`
- `SH_USER`, `SH_PROJECT` and `SH_VERSION` respectivelly the owner, project name and version of your project (e.g. _solange_, _tv_, _master_)

4. To launch an autoreloading server on <http://localhost:4010>, run

````
npm run dev
````

