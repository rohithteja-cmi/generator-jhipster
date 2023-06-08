/* eslint-disable prettier/prettier */
import { SERVER_MAIN_SRC_DIR } from '../generator-constants.mjs';
import { moveToJavaPackageSrcDir } from '../server/support/index.mjs';
import { communications } from '../server/server-base.mjs';

/**
 * @type {import('../base/api.mjs').WriteFileSection}
 * The import { renameSync } from 'fs';
 * default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

export const rabbitFiles = {
  config: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['config/RabbitMQConfig.java'],
    },
  ],
  domain: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['domain/RabbitMessageModel.java'],
    },
  ],
  listener: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['listener/RabbitMQConsumer.java'],
    },
  ],
  publisher: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['publisher/RabbitMQPublisher.java'],
    },
  ],
};

export default async function writeRabbitMQFilesTask({ application }) {
  if (communications.length === 0) {
    application.queueName = application.baseName;
    application.uniqueName = null;
    this.writeFiles({
      sections: rabbitFiles,
      context: application,
    });
  } else {
    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.fs.copyTpl(
          this.templatePath('src/main/java/package/listener/RabbitMQConsumer.java.ejs'),
          this.destinationPath(
            `${SERVER_MAIN_SRC_DIR}`
              .concat(this.jhipsterConfig.packageFolder)
              .concat('/listener/RabbitMQConsumer'.concat(queueName).concat('.java'))
          ),
          {
            packageName: this.jhipsterConfig.packageName,
            queueName: queueName,
            uniqueName: queueName,
            serverName: communications[i].server,
          }
        );
      }
    }

    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server || communications.length === 0) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.fs.copyTpl(
          this.templatePath('src/main/java/package/publisher/RabbitMQPublisher.java.ejs'),
          this.destinationPath(
            `${SERVER_MAIN_SRC_DIR}`
              .concat(this.jhipsterConfig.packageFolder)
              .concat('/publisher/RabbitMQPublisher'.concat(queueName).concat('.java'))
          ),
          {
            packageName: this.jhipsterConfig.packageName,
            queueName: queueName,
            uniqueName: queueName,
            baseName: this.jhipsterConfig.baseName,
            serverName: communications[i].server,
          }
        );
      }
    }

    this.fs.copyTpl(
      this.templatePath('src/main/java/package/domain/RabbitMessageModel.java.ejs'),
      this.destinationPath(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/domain/RabbitMessageModel.java')),
      {
        packageName: this.jhipsterConfig.packageName,
      }
    );

    for (let i = 0; i < communications.length; i++) {
      if (this.jhipsterConfig.baseName === communications[i].server || this.jhipsterConfig.baseName === communications[i].client) {
        const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
        const capitalizeClientName = communications[i].client.charAt(0).toUpperCase() + communications[i].client.slice(1);
        const queueName = capitalizeServerName.concat('To').concat(capitalizeClientName);
        this.fs.copyTpl(
          this.templatePath('src/main/java/package/config/RabbitMQConfig.java.ejs'),
          this.destinationPath(
            `${SERVER_MAIN_SRC_DIR}`
              .concat(this.jhipsterConfig.packageFolder)
              .concat('/config/RabbitMQConfig'.concat(queueName).concat('.java'))
          ),
          {
            packageName: this.jhipsterConfig.packageName,
            queueName: queueName,
            uniqueName: queueName,
            serverName: communications[i].server,
          }
        );
      }
    }
  }
}
