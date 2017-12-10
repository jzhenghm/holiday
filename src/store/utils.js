import * as selectors from './reducer'
import * as modes from '../store/modeTypes'

export function isCommitable() {
  return (getState) => {
    const adds = selectors.getAddDays(getState());
    const deletes = selectors.getDeleteDays(getState());
    const mode = selectors.getMode(getState());

    const commitable = mode !== modes.VIEW_HOLIDAYS_MODE &&
    ((adds !== 'undefined' && adds.length > 0) || (deletes !== 'undefined' && deletes.length > 0))
    console.log('commitable:'+commitable)
    return commitable;
  }

}