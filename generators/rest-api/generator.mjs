/* eslint-disable prettier/prettier */
import _ from 'lodash';

import BaseApplicationGenerator from '../base-application/index.mjs';
import { GENERATOR_REST_API, GENERATOR_BOOTSTRAP_APPLICATION_SERVER } from '../generator-list.mjs';
import cleanupRestAPIFilesTask from './cleanup.mjs';
import writeRestAPIFilesTask from './files.mjs';

/**
 * @typedef {import('../server/types.mjs').SpringBootApplication} SpringBootApplication
 */
/**
 * @class
 * @extends {BaseApplicationGenerator<SpringBootApplication>}
 */
export default class RestAPIGenerator extends BaseApplicationGenerator {
  async beforeQueue() {
    await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION_SERVER);
    if (!this.fromBlueprint) {
      await this.composeWithBlueprints(GENERATOR_REST_API);
    }
  }

  get writing() {
    return this.asWritingTaskGroup({
      cleanupRestAPIFilesTask,
      writeRestAPIFilesTask,
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.delegateTasksToBlueprint(() => this.writing);
  }
}
