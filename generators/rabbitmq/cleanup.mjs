import { SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';
import { communications } from '../server/server-base.mjs';

/* eslint-disable prettier/prettier */
/**
 * @typedef {import('../server/types.mjs').SpringBootApplication} SpringBootApplication
 */
/**
 * @typedef {import('./generator.mjs')} RabbitMQGenerator
 */
/**
 * @typedef {import('../base-application/tasks.mjs').ApplicationTaskParam<SpringBootApplication>} CleanupTaskParam
 */
/**
 * Removes server files that where generated in previous JHipster versions and therefore
 * need to be removed.
 *
 * @this {this} - RabbitMQGenerator
 * @param {CleanupTaskParam} - args
 */
export default function cleanupRabbitMQFilesTask({ application }) {
  if (this.isJhipsterVersionLessThan('7.0.0') && communications.length === 0) {
    this.removeFile(`${application.javaPackageSrcDir}config/RabbitMQConfig.java`);
    this.removeFile(`${application.javaPackageSrcDir}domain/RabbitMessageModel.java`);
    this.removeFile(`${application.javaPackageSrcDir}listener/RabbitMQConsumer.java`);
    this.removeFile(`${application.javaPackageSrcDir}publisher/RabbitMQPublisher.java`);
  }
  if (communications.length >= 0) {
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.removeFile(
          `${SERVER_MAIN_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/listener/RabbitMQConsumer'.concat(queueName).concat('.java'))
        );
      }
    }

    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.removeFile(
          `${SERVER_MAIN_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/publisher/RabbitMQPublisher'.concat(queueName).concat('.java'))
        );
      }
    }

    this.removeFile(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/domain/RabbitMessageModel.java'));

    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server || this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.removeFile(
          `${SERVER_MAIN_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/config/RabbitMQConfig'.concat(queueName).concat('.java'))
        );
      }
    }
  }
}
