import type { DependencyContainer } from "tsyringe"
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod"
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer"

class AllQuestsFinished implements IPostDBLoadMod
{
  private container: DependencyContainer

  public postDBLoad(container: DependencyContainer):void
  {

    this.container = container  
    const quests = this.container.resolve<DatabaseServer>("DatabaseServer").getTables().templates.quests
    //The following is ripped straight from Ereshkigal's All Quests Available mod with minor changes

    for (let file in quests)
    {
      let fileData = quests[file]

      fileData.conditions.AvailableForFinish = [
      {
        ...fileData.conditions.AvailableForFinish[0],
        compareMethod: ">=",
        conditionType: "Level",
        value: "1",
      }]
    }
  }
}

module.exports = {mod: new AllQuestsFinished()}