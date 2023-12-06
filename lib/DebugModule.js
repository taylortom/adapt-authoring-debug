import { AbstractModule } from 'adapt-authoring-core';
/**
* Adds a debug panel for the Adapt authoring tool UI
* @extends debug
* @extends {AbstractModule}
*/
class DebugModule extends AbstractModule {
  /** @override */
  async init() {
    const ui = await this.app.waitForModule('ui');
    ui.addUiPlugin(`${this.rootDir}/ui-plugins`);
  }
}

export default DebugModule;