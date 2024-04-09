import { useSignal } from '@preact/signals';

import '@/components/content/Icon/Icon';
import '@/components/composition/BorderedList/BorderedList';
import { CustomElement } from '@/types/customElement';
import { MaterialCategory } from '@/types/locatorApi';

interface MaterialCategoriesNavProps {
  readonly materialCategories: MaterialCategory[];
  /** The base of the href for material links */
  readonly basePath: string;
}

export default function MaterialCategoriesNav({
  materialCategories,
  basePath,
}: MaterialCategoriesNavProps) {
  console.log(materialCategories);
  const activeCategoryId = useSignal<string | null>(null);

  function handleCategoryClick(categoryId: string | null) {
    activeCategoryId.value = categoryId;
  }

  return (
    <locator-material-categories-nav>
      <nav>
        <ul>
          {materialCategories.map((category) => {
            const isActive = activeCategoryId.value === category.id;
            const materialListId = `category-${category.id}-materials`;

            return (
              <li key={category.id} data-active={isActive}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  aria-expanded={isActive}
                  aria-controls={materialListId}
                >
                  {category.name}
                  <locator-icon
                    icon="arrow-right"
                    color="primary"
                  ></locator-icon>
                </button>
                <ul id={materialListId}>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(null)}
                      aria-expanded={isActive}
                      aria-controls={materialListId}
                    >
                      <locator-icon
                        icon="arrow-left"
                        color="primary"
                      ></locator-icon>
                      {category.name}
                    </button>
                  </li>
                  {category.materials.map((material) => (
                    <li key={material.id}>
                      <a
                        href={`${basePath}?materialId=${material.id}&materialName=${encodeURIComponent(material.name)}`}
                      >
                        {material.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
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
