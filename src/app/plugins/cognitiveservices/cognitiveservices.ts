import { FaceApiPluginModule } from './faceapi/faceapi.plugin';
import { PluginConfig } from '../../lib/plugin/plugin-config.decorator';


@PluginConfig({
    name: 'cognitiveservices',
    configUrl: 'cognitiveservices.config.json',
    description: 'Microsoft Cognitive Services Plugin',
    placements: [
        {slot: 'helloworldday', priority: 4,
        component: FaceApiPluginModule}
    ]
})
export default class CognitiveServicesPlugin {

}
