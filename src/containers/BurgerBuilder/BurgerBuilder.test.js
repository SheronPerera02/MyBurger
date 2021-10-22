import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BurgerBuilder } from './BurgerBuilder';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it('should render <OrderSummary/> if "ings" prop is defined', () => {
    wrapper.setProps({ ings: {}, price: 0 });
    expect(wrapper.find(OrderSummary)).toHaveLength(1);
  });
});
