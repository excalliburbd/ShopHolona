import { connect } from 'react-redux';
import moment from 'moment';

import OrderDeatils from '../components/BackOffice/OrderDetails';

import { getSelectedOrder } from '../selectors/orderSelectors';
import { getOrderStatus } from '../selectors/backOfficeSelectors';
import { changeOrderStatus } from '../thunks/ordersThunks';
import { getShopID } from '../selectors/shopSelectors';
import { getToken } from '../selectors/userSelectors';

const mapStateToProps = state => {
  return {
    id: `IN${getSelectedOrder(state).id}`,
    date: `${ moment(getSelectedOrder(state).created_at).toDate() }`,
    status: getOrderStatus(getSelectedOrder(state).order_status),
    shPrice: getSelectedOrder(state).total_sh_price,
    price: getSelectedOrder(state).total_price,
    shop: getShopID(state),
    token: getToken(state),
    productList: getSelectedOrder(state).details || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChangeOrderStatus: (shop, token, order, status) => {
      dispatch(changeOrderStatus(shop, token, order, status));
    },
    getOrderStatus: id => {
      return getOrderStatus(id);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDeatils);
