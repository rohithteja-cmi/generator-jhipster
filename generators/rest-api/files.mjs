/* eslint-disable prettier/prettier */
import { SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } from '../generator-constants.mjs';
import { moveToJavaPackageSrcDir, moveToJavaPackageTestDir } from '../server/support/index.mjs';
import { communications } from '../server/server-base.mjs';

/**
 * @type {import('../base/api.mjs').WriteFileSection}
 * The import { renameSync } from 'fs';
 * default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */

export const restAPIFiles = {
  config: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['config/webClient/AccessToken.java', 'config/webClient/WebClientConfig.java'],
    },
  ],
  web: [
    {
      path: `${SERVER_MAIN_SRC_DIR}package/`,
      renameTo: moveToJavaPackageSrcDir,
      templates: ['web/rest/ClientResource.java', 'web/rest/ServerResource.java'],
    },
  ],
  test: [
    {
      path: `${SERVER_TEST_SRC_DIR}package/`,
      renameTo: moveToJavaPackageTestDir,
      templates: ['web/rest/ClientResourceUT.java', 'web/rest/ServerResourceUT.java'],
    },
  ],
};

export default async function writeRestAPIFilesTask() {
  // Write client files
  for (let i = 0; i < communications.length; i++) {
    if (this.jhipsterConfig.baseName === communications[i].client) {
      const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
      this.fs.copyTpl(
        this.templatePath('src/main/java/package/web/rest/ClientResource.java.ejs'),
        this.destinationPath(
          `${SERVER_MAIN_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/web/rest/comm/ClientResource'.concat(capitalizeServerName).concat('.java'))
        ),
        {
          packageName: this.jhipsterConfig.packageName,
          capitalizeServerName,
          serverName: communications[i].server.toLowerCase(),
        }
      );
    }
  }

  // Write client UT files
  for (let i = 0; i < communications.length; i++) {
    if (this.jhipsterConfig.baseName === communications[i].client) {
      const capitalizeServerName = communications[i].server.charAt(0).toUpperCase() + communications[i].server.slice(1);
      this.fs.copyTpl(
        this.templatePath('src/test/java/package/web/rest/ClientResourceUT.java.ejs'),
        this.destinationPath(
          `${SERVER_TEST_SRC_DIR}`
            .concat(this.jhipsterConfig.packageFolder)
            .concat('/web/rest/comm/ClientResource'.concat(capitalizeServerName).concat('UT').concat('.java'))
        ),
        {
          packageName: this.jhipsterConfig.packageName,
          capitalizeServerName,
          serverName: communications[i].server.toLowerCase(),
        }
      );
    }
  }

  // Write server files
  for (let i = 0; i < communications.length; i++) {
    if (this.jhipsterConfig.baseName === communications[i].server) {
      this.fs.copyTpl(
        this.templatePath('src/main/java/package/web/rest/ServerResource.java.ejs'),
        this.destinationPath(
          `${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/web/rest/comm/ServerResource.java')
        ),
        {
          packageName: this.jhipsterConfig.packageName,
          serverName: communications[i].server.toLowerCase(),
        }
      );
    }
  }

  // Write server UT files
  for (let i = 0; i < communications.length; i++) {
    if (this.jhipsterConfig.baseName === communications[i].server) {
      this.fs.copyTpl(
        this.templatePath('src/test/java/package/web/rest/ServerResourceUT.java.ejs'),
        this.destinationPath(
          `${SERVER_TEST_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/web/rest/comm/ServerResourceUT.java')
        ),
        {
          packageName: this.jhipsterConfig.packageName,
          serverName: communications[i].server.toLowerCase(),
        }
      );
    }
  }

  this.fs.copyTpl(
    this.templatePath('src/main/java/package/config/webClient/AccessToken.java.ejs'),
    this.destinationPath(`${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/config/webClient/AccessToken.java')),
    {
      packageName: this.jhipsterConfig.packageName,
    }
  );

  this.fs.copyTpl(
    this.templatePath('src/main/java/package/config/webClient/WebClientConfig.java.ejs'),
    this.destinationPath(
      `${SERVER_MAIN_SRC_DIR}`.concat(this.jhipsterConfig.packageFolder).concat('/config/webClient/WebClientConfig.java')
    ),
    {
      packageName: this.jhipsterConfig.packageName,
    }
  );
}
