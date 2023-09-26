#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
// cli spinners
import ora from "ora";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);
const dependencies = ['axios'];
const moduleName = 'payment';
const currentPath = process.cwd();
const projectPath = path.join(currentPath, moduleName);
// TODO: change to your boilerplate repo
const git_repo = "https://github.com/masterghost2002/kuberanix-payment-module";
// create project directory
if (fs.existsSync(projectPath)) {
  console.log(`The file ${moduleName} already exist in the current directory`);
  process.exit(1);
}
else {
  fs.mkdirSync(projectPath);
}

try {
  const gitSpinner = ora("Downloading kuberanix razorpay frontend payment module...").start();
  // clone the repo into the project folder -> creates the new boilerplate
  await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
  gitSpinner.succeed();

  const cleanSpinner = ora("Removing useless files").start();
  // remove my git history
  const rmGit = rm(path.join(projectPath, ".git"), { recursive: true, force: true });
  // remove the installation file
  const rmBin = rm(path.join(projectPath, "bin"), { recursive: true, force: true });
  const rmPackageJson = rm(path.join(projectPath, "package.json"), { recursive: true, force: true });
  const rmPackageJsonLocked = rm(path.join(projectPath, "package-lock.json"), { recursive: true, force: true });
  const rmHusky = rm(path.join(projectPath, ".husky"), { recursive: true, force: true });
  const rmEslint = rm(path.join(projectPath, ".eslintrc.cjs"), { recursive: true, force: true });
  const prettierignore = rm(path.join(projectPath, ".prettierignore"), { recursive: true, force: true });
  const prettierjson = rm(path.join(projectPath, ".prettierrc.json"), { recursive: true, force: true });
  const gitignore = rm(path.join(projectPath, ".gitignore"), { recursive: true, force: true });




  await Promise.all([rmGit, rmBin, rmPackageJson, rmPackageJsonLocked, rmHusky, rmEslint, prettierignore, prettierjson, gitignore]);
  cleanSpinner.succeed();

  const npmSpinner = ora("Installing module dependencies...").start();
  for(let dependency of dependencies)
    await exec(`npm install ${dependency}`);
  npmSpinner.succeed();

  console.log("Module installation is done!");
} catch (error) {
  // clean up in case of error, so the user does not have to do it manually
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.log(error);
}