import '@/components/content/Icon/Icon';
import { CustomElement } from '@/types/customElement';
import { MaterialCategory } from '@/types/locatorApi';

export default function MaterialCategoriesNav({
  materialCategories,
}: {
  readonly materialCategories: readonly MaterialCategory[];
}) {
  console.log(materialCategories);

  return (
    <locator-material-categories-nav>
      <nav>
        <ul>
          {materialCategories.map((category) => (
            <li key={category.id}>
              <button type="button">
                {category.name}
                <locator-icon icon="arrow-right" color="primary"></locator-icon>
              </button>
              <ul>
                <li>
                  <button type="button">
                    <locator-icon
                      icon="arrow-left"
                      color="primary"
                    ></locator-icon>
                    {category.name}
                  </button>
                </li>
                {category.materials.map((material) => (
                  <li key={material.id}>
                    <a href="#link">{material.name}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </locator-material-categories-nav>
  );
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'locator-material-categories-nav': CustomElement;
    }
  }
}
