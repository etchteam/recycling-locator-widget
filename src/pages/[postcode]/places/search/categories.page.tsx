import { Suspense } from 'preact/compat';
import { Await, useLoaderData } from 'react-router-dom';

import '@/components/composition/Wrap/Wrap';
import { MaterialCategory } from '@/types/locatorApi';

import { PlacesSearchCategoriesLoaderResponse } from './categories.loader';

function CategoriesPageContent({
  materialCategories,
}: {
  readonly materialCategories: readonly MaterialCategory[];
}) {
  console.log(materialCategories);

  return (
    <nav>
      <ul>
        <li>
          <button>Automotive</button>
          <ul>
            <li>
              <a href="#link">Tyres</a>
            </li>
            <li>
              <a href="#link">Car batteries</a>
            </li>
            <li>
              <a href="#link">Engine oil</a>
            </li>
          </ul>
        </li>
        <li>
          <button>Cardboard</button>
          <ul>
            <li>
              <a href="#link">Cardboard boxes</a>
            </li>
            <li>
              <a href="#link">Cardboard tubes</a>
            </li>
            <li>
              <a href="#link">Cardboard trays</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default function CategoriesPage() {
  const { materialCategories: materialCategoriesPromise } =
    useLoaderData() as PlacesSearchCategoriesLoaderResponse;

  return (
    <locator-wrap>
      <Suspense fallback={null}>
        <Await resolve={materialCategoriesPromise}>
          {(materialCategories) => (
            <CategoriesPageContent materialCategories={materialCategories} />
          )}
        </Await>
      </Suspense>
    </locator-wrap>
  );
}
