import { FaceApiPluginModule } from './faceapi/faceapi.plugin';
import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';


@PluginConfig({
    name: 'cognitiveservices',
    configUrl: 'cognitiveservices.config.json',
    description: 'Microsoft Cognitive Services Plugin',
    placements: [
        {slot: null, priority: 1,
        component: FaceApiPluginModule}
    ]
})
export default class CognitiveServicesPlugin {

}
