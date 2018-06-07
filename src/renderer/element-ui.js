import Vue from 'vue';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Button,
  Select,
  Card,
  Input,
  Form,
  FormItem,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

// configure language
locale.use(lang);
