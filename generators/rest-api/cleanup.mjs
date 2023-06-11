import { SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } from '../generator-constants.mjs';
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
export default function cleanupRestAPIFilesTask({ application }) {
  if (this.isJhipsterVersionLessThan('7.0.0')) {
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        this.removeFile(
          `${SERVER_MAIN_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/web/rest/comm/ClientResource'.concat(capitalizeServerName).concat('.java'))
        );
      }
    }

    // Write client UT files
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        this.removeFile(
          `${SERVER_TEST_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/web/rest/comm/ClientResource'.concat(capitalizeServerName).concat('UT').concat('.java'))
        );
      }
    }

    // Write server files
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server) {
        this.removeFile(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/web/rest/comm/ServerResource.java'));
      }
    }

    // Write server UT files
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server) {
        this.removeFile(`${SERVER_TEST_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/web/rest/comm/ServerResourceUT.java'));
      }
    }

    this.removeFile(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/config/webClient/AccessToken.java'));
    this.removeFile(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/config/webClient/WebClientConfig.java'));
  }
  if (this.isJhipsterVersionLessThan('7.1.0')) {
    this.removeFile(`${application.javaPackageSrcDir}config/RabbitMQProperties.java`);
  }
}
