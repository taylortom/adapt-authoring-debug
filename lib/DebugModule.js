import { AbstractModule } from 'adapt-authoring-core'
import { exec } from 'child_process'
/**
* Adds a debug panel for the Adapt authoring tool UI
* @extends debug
* @extends {AbstractModule}
*/
class DebugModule extends AbstractModule {
  /** @override */
  async init() {
    const [auth, server, ui] = await this.app.waitForModule('auth', 'server', 'ui')
    ui.addUiPlugin(`${this.rootDir}/ui-plugins`)

    server.api.createChildRouter('debug').addRoute({
      route: '/versions',
      handlers: { get: this.handleVersions.bind(this) }
    });
    auth.secureRoute('/api/debug/versions', 'GET', ['debug'])
  }

  async handleVersions(req, res, next) {
    const [fw, contentplugin] = await this.app.waitForModule('adaptframework', 'contentplugin')
    res.json({
      'adapt-authoring': {
        version: this.app.pkg.version
      },
      'adapt_framework': { version: fw.version },
      'contentplugins': (await contentplugin.find()).map(c => [c.name, c.version]),
      'modules': Object.values(this.app.dependencyloader.instances).map(m => [m.name, m.pkg.version])
    })
  }

  async getGitCommitHash(cwd) {
    return new Promise(resolve => {
      exec('git rev-parse HEAD', { cwd }, (error, stdout, stderr) => {
        if(error) {
          return this.log('error', error || stderr)
        }
        resolve(stdout.trim())
      })
    })
  }
}

export default DebugModule;
