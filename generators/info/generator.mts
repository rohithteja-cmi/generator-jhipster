// We use console.log() in this generator because we want to print on stdout not on
// stderr unlike yeoman's log() so that user can easily redirect output to a file.
/* eslint-disable no-console */
/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import chalk from 'chalk';

import BaseGenerator from '../base/index.mjs';
import JSONToJDLEntityConverter from '../../jdl/converters/json-to-jdl-entity-converter.js';
import JSONToJDLOptionConverter from '../../jdl/converters/json-to-jdl-option-converter.js';
import type { JHipsterGeneratorFeatures, JHipsterGeneratorOptions } from '../base/api.cjs';

export default class extends BaseGenerator {
  constructor(args: string | string[], options: JHipsterGeneratorOptions, features: JHipsterGeneratorFeatures) {
    super(args, options, { unique: 'namespace', ...features });

    this.option('skipCommit', {
      description: 'Skip commit',
      type: Boolean,
      hide: true,
      default: true,
    });

    if (this.options.help) return;

    this.env.options.skipInstall = true;
  }

  get [BaseGenerator.INITIALIZING]() {
    return this.asInitialingTaskGroup({
      sayHello() {
        this.log(chalk.white('Welcome to the JHipster Information Sub-Generator\n'));
      },

      async checkJHipster() {
        try {
          const { stdout } = await this.spawnCommand('npm', ['list', 'generator-jhipster'], { stdio: 'pipe' });
          console.log(`\n\`\`\`\n${stdout}\`\`\`\n`);
        } catch ({ stdout }) {
          console.log(`\n\`\`\`\n${stdout}\`\`\`\n`);
        }
      },

      displayConfiguration() {
        // Omit sensitive information.
        const result = JSON.stringify({ ...this.jhipsterConfig, jwtSecretKey: undefined, rememberMeKey: undefined }, null, 2);
        console.log('\n##### **JHipster configuration, a `.yo-rc.json` file generated in the root folder**\n');
        console.log(`\n<details>\n<summary>.yo-rc.json file</summary>\n<pre>\n${result}\n</pre>\n</details>\n`);
      },

      displayEntities() {
        console.log('\n##### **JDL for the Entity configuration(s) `entityName.json` files generated in the `.jhipster` directory**\n');
        const jdl = this.generateJDLFromEntities();
        console.log('<details>\n<summary>JDL entity definitions</summary>\n');
        console.log(`<pre>\n${jdl?.toString()}\n</pre>\n</details>\n`);
      },

      async checkJava() {
        console.log('\n##### **Environment and Tools**\n');
        const result = await this.spawnCommand('java', ['-version'], { stdio: 'pipe' });
        console.log(result.stderr);
        console.log();
      },

      async checkGit() {
        const result = await this.spawnCommand('git', ['version'], { stdio: 'pipe' });
        console.log(result.stdout);
        console.log();
      },

      async checkNode() {
        const { stdout } = await this.spawnCommand('node', ['-v'], { stdio: 'pipe' });
        console.log(`node: ${stdout}`);
      },

      async checkNpm() {
        const { stdout } = await this.spawnCommand('npm', ['-v'], { stdio: 'pipe' });
        console.log(`npm: ${stdout}`);
        console.log();
      },

      async checkDocker() {
        const { stdout } = await this.spawnCommand('docker', ['-v'], { stdio: 'pipe' });
        console.log(stdout);
      },

      async checkDockerCompose() {
        const { stdout } = await this.spawnCommand('docker', ['compose', 'version'], { stdio: 'pipe' });
        console.log(stdout);
      },
    });
  }

  /**
   * @returns generated JDL from entities
   */
  generateJDLFromEntities() {
    let jdlObject;
    const entities = new Map();
    try {
      this.getExistingEntities().forEach(entity => {
        entities.set(entity.name, entity.definition);
      });
      jdlObject = JSONToJDLEntityConverter.convertEntitiesToJDL({
        entities,
        skippedUserManagement: this.jhipsterConfig.skipUserManagement,
      });
      JSONToJDLOptionConverter.convertServerOptionsToJDL({ 'generator-jhipster': this.config.getAll() }, jdlObject);
    } catch (error) {
      this.log((error as any).message || error);
      this.error('\nError while parsing entities to JDL\n');
    }
    return jdlObject;
  }
}
