
export const Type = {
  UPDATE_HOST: 'UPDATE_HOST',
  UPDATE_CLIENT_ID: 'UPDATE_CLIENT_ID',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
};

const updateHost = (payload) => ({ type: Type.UPDATE_HOST, payload });
const updateClientId = (payload) => ({ type: Type.UPDATE_CLIENT_ID, payload });
const updateUser = (payload) => ({ type: Type.UPDATE_USER, payload });
const updatePassword = (payload) => ({ type: Type.UPDATE_PASSWORD, payload });
const clearMessages = () => ({ type: Type.CLEAR_MESSAGES });

export const Action = {
  updateHost,
  updateClientId,
  updateUser,
  updatePassword,
  clearMessages,
}