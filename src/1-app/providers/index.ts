import compose from 'compose-function';
import withRouter from './withRouter';
import withMUI from './withMUI';
import withStore from './withStore';

const withProviders = compose(withMUI, withStore, withRouter);

export default withProviders;
