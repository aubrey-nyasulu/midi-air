import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * A simple test method to verify JSI connectivity
   */
  helloKotlin(name: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'VisionCameraObjectTracker'
);
