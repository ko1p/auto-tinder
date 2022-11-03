import compose from 'compose-function';
import withAntConfig from './withAntConfig';
import withRouter from './withRouter';
import withStore from './withStore';

const withProviders = compose(withStore, withRouter, withAntConfig);

export default withProviders;
