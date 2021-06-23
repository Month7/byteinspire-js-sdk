import Module from '../../module';
import InspireCloud from '../../inspirecloud';

export default class UserModule extends Module {
  constructor(inspirecloud: InspireCloud) {
    super(inspirecloud);
    this.name = 'user';
  }
}
