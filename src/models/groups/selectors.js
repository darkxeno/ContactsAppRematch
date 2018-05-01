import { createSelector } from "reselect";

const selectGroupsDomain = () => state => state.groups.Group;

const makeSelectGroupsIds = () =>
  createSelector(selectGroupsDomain(), groups => groups.items);

const makeSelectGroupsData = () =>
  createSelector(selectGroupsDomain(), groups => groups.itemsById);

const makeSelectGroupById = id =>
  createSelector(makeSelectGroupsData(), groups => groups[id]);

const makeSelectFormOptions = () =>
  createSelector(selectGroupsDomain(), state =>
    state.items.map(key => {
      const { id, name } = state.itemsById[key];
      return {
        value: id,
        text: name
      };
    })
  );

export default selectGroupsDomain;

export {
  makeSelectGroupsIds,
  makeSelectGroupsData,
  makeSelectGroupById,
  makeSelectFormOptions
};
