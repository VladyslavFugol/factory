export interface IFeatureConfig<T> {
  name: string;
  isDisabled: (items: T[]) => boolean;
  action: (items: T[]) => void;
}

export interface IFeature {
  name: string;
  isDisabled: boolean;
  action: () => void;
}

class Feature<T> implements IFeature {
  name: string = '';
  isDisabled: boolean = false;

  action(): void {
  }

  constructor(featureSettings: IFeatureConfig<T>, items: T[]) {
    this.name = featureSettings.name;
    this.isDisabled = featureSettings.isDisabled(items);
    this.action = () => featureSettings.action(items);
  }
}

export class FeaturesFactory<T> {
  private readonly items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  createFeatures(configs: IFeatureConfig<T>[]): IFeature[] {
    const features: IFeature[] = [];

    configs.forEach((config) => {
      features.push(new Feature(config, this.items));
    });

    return features;
  }
}