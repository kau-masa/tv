# craft ai javascript starter kit #

### Setup ###

* Install [Nodejs](https://nodejs.org/en/download/) on your computer;
* Install [Chrome](https://www.google.fr/chrome/browser/desktop/) on your computer.

### Web app  ###

To install dependencies, run `npm install` in a console.
To launch an autoreloading server on <http://localhost:4000>, run `npm run dev` in a console.

### Hello World ###

#### Prerequisites ####

1. Go to [craft ai workbench](https://workbench.craft.ai/),
2. Add the project to your workspace,
3. Edit the project and open the file `craft_project.json`, notice the `Application ID` and `Application secret` values,
4. Update variables in file `src/constants.js`:
 * `APP_ID` is the `Application ID` showed `craft_project.json`,
 * `APP_SECRET` is the `Application secret` showed `craft_project.json`,
 * `USER` is your github login name
 * `PROJECT` is the name of the github projet  (should be `tv` in you've just forked the project without renaming),
 * `VERSION` is the version of the github projet (should be `master`)

This demo uses behavior file `src/decision/Hello.bt`. It's a simple demo that involve a single action that helps understanding behavior update.

### More ###

If you have to have a develop your craft ai skills, just follow our [tutorials](http://doc.craft.ai/tutorials/index.html) and read our [documentation](http://doc.craft.ai/index.html)

If you have any questions, please contact our [support]('mailto:support@craft.ai')
