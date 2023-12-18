import { useState } from 'react';
import { FeaturesFactory, IFeatureConfig } from './utils/feature-factory/featureFactory.ts';

interface Item {
  id: number;
  type: string;
  name: string;
  format?: string;
}

const items: Item[] = [
  { id: 1, type: 'document', name: 'document 1', format: 'pdf' },
  { id: 2, type: 'document', name: 'document 2', format: 'jpeg' },
  { id: 2, type: 'folder', name: 'folder 1' }
];

const features: IFeatureConfig<Item>[] = [
  {
    name: 'First Feature',
    isDisabled: (items: Item[]) => items.length > 1,
    action: (items: Item[]) => console.log(items),
  },
  {
    name: 'Second Feature',
    isDisabled: (items: Item[]) => !!items.length,
    action: (items: Item[]) => console.log(items),
  },
  {
    name: 'Third Feature',
    isDisabled: (items: Item[]) => items.length === 0,
    action: (items: Item[]) => console.log(items),
  },
];

function App() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const onSelectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
  }

  const featuresCreator = new FeaturesFactory(selectedItems);
  const buttons = featuresCreator.createFeatures(features);

  return (
    <div>
      {items.map((item) => (
        <div>
          <button onClick={() => onSelectItem(item)} >SELECT ITEM</button>
          <div>{item.name}</div>
        </div>
      ))}
      {buttons.map((button) => (
        <button onClick={button.action} disabled={button.isDisabled}>
          {button.name}
        </button>
      ))}
    </div>
  )
}

export default App
