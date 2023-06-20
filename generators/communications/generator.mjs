/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
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
 * WITHOUT WARRANTIES OR CONDITIONS OF ANYmessageBrokerRabbitMQ KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable consistent-return */
import _ from 'lodash';

import BaseApplicationGenerator from '../base-application/index.mjs';
import { GENERATOR_COMMUNICATIONS, GENERATOR_BOOTSTRAP_APPLICATION } from '../generator-list.mjs';
// import cleanupRestAPIFilesTask from './cleanup.mjs';
import writeCommunicationsFilesTask from './files.mjs';
import { communications } from '../server/server-base.mjs';
import messageBrokerTypes from '../../jdl/jhipster/message-broker-types.js';

const { REST_API, RABBITMQ, KAFKA, PULSAR } = messageBrokerTypes;

/**
 * @typedef {import('../server/types.mjs').SpringBootApplication} SpringBootApplication
 */
/**
 * @class
 * @extends {BaseApplicationGenerator<SpringBootApplication>}
 */
export default class CommunicationsGenerator extends BaseApplicationGenerator {
  async beforeQueue() {
    await this.dependsOnJHipster(GENERATOR_BOOTSTRAP_APPLICATION);
    if (!this.fromBlueprint) {
      await this.composeWithBlueprints(GENERATOR_COMMUNICATIONS);
    }
  }

  // Public API method used by the getter and also by Blueprints
  get initializing() {
    return {
      getSharedConfig() {
        this.loadAppConfig();
        this.loadServerConfig();
        this.loadDerivedAppConfig();
        this.loadDerivedServerConfig();
      },
    };
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.delegateTasksToBlueprint(() => this.initializing);
  }

  // // Public API method used by the getter and also by Blueprints
  // get prompting() {
  //   return {
  //     askPipeline: prompts.askPipeline,
  //     askIntegrations: prompts.askIntegrations,
  //   };
  // }

  // get [BaseApplicationGenerator.PROMPTING]() {
  //   return this.delegateTasksToBlueprint(() => this.prompting);
  // }

  // _loadCcommunicationsConfig(dest = this) {
  //   dest.communications = communications;
  //   for (let i = 0; i < communications.length; i++) {
  //     if (dest.baseName === communications[i].server || dest.baseName === communications[i].client) {
  //       dest.communicationsAsyncTypeRabitMQ ||= communications[i].framework === RABBITMQ;
  //       // dest.communicationsAsyncTypeKafka ||= communications[i].framework === KAFKA;
  //       // dest.communicationsAsyncTypePulsar ||= communications[i].framework === PULSAR;
  //       dest.communicationsSyncTypeRestAPI ||= communications[i].framework === REST_API;
  //     }
  //   }
  // }

  // Public API method used by the getter and also by Blueprints
  // get loading() {
  //   return {
  //     loadSharedConfig() {
  //       this._loadCcommunicationsConfig();
  //     },
  //   };
  // }

  // get [BaseApplicationGenerator.LOADING]() {
  //   return this.delegateTasksToBlueprint(() => this.loading);
  // }

  // Public API method used by the getter and also by Blueprints
  get writing() {
    return this.asWritingTaskGroup({
      writeCommunicationsFilesTask,
    });
  }

  get [BaseApplicationGenerator.WRITING]() {
    return this.delegateTasksToBlueprint(() => this.writing);
  }
}
