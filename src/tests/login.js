import { ReactSelector } from 'testcafe-react-selectors';

fixture`Login test`.page`http://localhost:3000`;

test('Add new task', async t => {
  const loginInput = ReactSelector('Login Input');
  const subscription = ReactSelector('Subscription');

  await t
    .typeText(loginInput, 'hyojin@getproperly.com')
    .pressKey('enter')
    .expect(subscription.exists)
    .ok();
});
