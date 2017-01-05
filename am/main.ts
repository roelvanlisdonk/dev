import { User } from './schema/User'
import { cuid } from './services/cuid'
import { render } from './services/dom'
import { get, IStoreBooleanField, IStoreNumberField, IStoreObject, IStoreStringField, save } from './services/store'
import { div, getVirtualDom, IVirtualDomNode, span } from './services/virtual.dom'

function AddTestData() {
    const user = new User();
    user.id = cuid();
    user.email.value = 'test@test.com';
    save(user);
}

AddTestData();
const user = get<User>('test@test.com');