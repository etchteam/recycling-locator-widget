export default function StartPage() {
  return (
    <locator-layout>
      <locator-layout-main>
        <locator-layout-header>
          <locator-logo>Recycling Locator</locator-logo>
        </locator-layout-header>
        <h2>Find places to recycle</h2>
        <form>
          <label htmlFor="location">Where are you?</label>
          <input type="text" name="location" id="location" />
          <button type="submit">Get started</button>
        </form>
      </locator-layout-main>
      <locator-layout-aside>
        <p>Use this service to:</p>
        <ul>
          <li>see your nearest places to recycle</li>
          <li>find out how to recycle a specific item</li>
          <li>check what you can recycle at home</li>
        </ul>
      </locator-layout-aside>
    </locator-layout>
  );
}
