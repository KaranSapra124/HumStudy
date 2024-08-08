import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import {
  NormalInput,
  TextareaInput,
} from '../../components/inputs/ModalInputs';
import Modal from '../../components/modals/Modal';
import InputWithSearch from '../../components/inputs/InputWithSearch';

export default function SupportModal({
  saveFunc,
  setIsModal,
  view,
  editItem,
  users,
}) {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [replies, setReplies] = useState('');
  const [replyMsg, setReplyMsg] = useState('');
  const [isReply, setIsReply] = useState(false);
  const [modal, setModal] = useState(true);
  const [selectedReplyIndex, setSelectedReplyIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const handleAddReply = () => {
    setReplies([...replies, { replyBy: 'Admin', message: replyMsg }]);
    setIsReply(false);
    setReplyMsg('');
  };
  const handleEditReply = (replyIndex) => {
    setEditText(replies[replyIndex].message);
    setSelectedReplyIndex(replyIndex);
  };
  const handleDeleteReply = (replyIndex) => {
    setReplies(replies.filter((rep, i) => replyIndex !== i));
  };
  const handleSaveReply = (replyIndex) => {
    setReplies(
      replies.map((rep, i) =>
        replyIndex !== i ? rep : { ...rep, message: editText }
      )
    );
    setSelectedReplyIndex(-1);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const item = {
      ...editItem,
      userId,
      subject,
      message,
      replies,
    };
    saveFunc(item);
    setModal(false);
  };
  const putValues = () => {
    setUserId(editItem.userId);
    setUser(users.find((item) => item._id == editItem.userId)?.name || '');
    setSubject(editItem.subject);
    setMessage(editItem.message);
    setReplies(editItem.replies);
  };

  useEffect(() => {
    if (view === 'edit') putValues();
  }, []);

  return (
    <>
      <Modal setIsModal={setIsModal} modal={modal}>
        <h2>{view === 'edit' ? 'Edit' : 'Add'} Support</h2>
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-4 sm:p-8 p-4 text-darkgray_1 sm:text-base text-[.7rem]"
        >
          <div className="flex md:items-center gap-10 justify-between">
            <label htmlFor="userId">User:</label>
            <div className="md:max-w-[70%] flex-1">
              <InputWithSearch
                options={users}
                selectedOpt={user}
                setSelectedOpt={setUser}
                setSelectedOptId={setUserId}
              />
            </div>
          </div>
          <TextareaInput
            label={'Subject'}
            rows={2}
            inputId={'subject'}
            inputState={subject}
            setInputState={setSubject}
          />
          <TextareaInput
            label={'Message'}
            rows={5}
            inputId={'message'}
            inputState={message}
            setInputState={setMessage}
          />
          <div className="flex flex-col gap-2">
            <h4>Replies</h4>
            <div className="flex">
              {replies.length > 0 && (
                <div className="w-[15px]">
                  <div className="h-full relative left-full border-0 border-l border-gray-200 w-0"></div>
                </div>
              )}
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  {replies.length > 0
                    ? replies.map((rep, i) => (
                        <div className="flex items-center" key={i}>
                          <div className="w-[15px] h-0 border-0 border-b border-gray-200"></div>
                          <div
                            key={i}
                            className={`border border-gray-200 rounded-md p-2 relative ${
                              selectedReplyIndex === i ? 'flex-grow' : ''
                            }`}
                          >
                            {rep.replyBy === 'Admin' ? (
                              <p className="text-[.6rem] absolute left-[10px] top-0 -translate-y-2/4 bg-white text-green-400 px-1">
                                You
                              </p>
                            ) : (
                              <p className="text-[.6rem] absolute left-[10px] top-0 -translate-y-2/4 bg-white text-gray-400 px-1">
                                User
                              </p>
                            )}
                            <div className="flex justify-between gap-2 items-center">
                              {selectedReplyIndex !== i && <p>{rep.message}</p>}
                              {selectedReplyIndex === i && (
                                <textarea
                                  type="text"
                                  rows={3}
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="p-2 w-full outline-none border border-gray-200 rounded-md"
                                ></textarea>
                              )}
                            </div>
                            <div className="absolute flex gap-2 top-full -translate-y-2/4 right-1">
                              <button
                                type="button"
                                onClick={() =>
                                  selectedReplyIndex === i
                                    ? handleSaveReply(i)
                                    : handleEditReply(i)
                                }
                                className={`text-[.6rem] bg-white pl-1 ${
                                  selectedReplyIndex === i
                                    ? 'text-green-400'
                                    : ''
                                }`}
                              >
                                {selectedReplyIndex === i ? 'Save' : 'edit'}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  selectedReplyIndex === i
                                    ? setSelectedReplyIndex(-1)
                                    : handleDeleteReply(i)
                                }
                                className="text-[.6rem] bg-white pr-1"
                              >
                                {selectedReplyIndex === i ? 'Cancel' : 'Delete'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    : !isReply && (
                        <p className="text-gray-400 text-center py-4">
                          No reply
                        </p>
                      )}
                </div>
                {isReply && (
                  <div className="flex items-center w-full mt-3">
                    {replies.length > 0 && (
                      <div className="w-[25px] h-0 border-0 border-b border-gray-200"></div>
                    )}
                    <textarea
                      type="text"
                      rows={3}
                      name="replyMessage"
                      id="replyMessage"
                      placeholder="Add message"
                      value={replyMsg}
                      onChange={(e) => setReplyMsg(e.target.value)}
                      className="border border-gray-100 p-2 rounded-md outline-none w-full mt-4"
                    ></textarea>
                  </div>
                )}
                <div className="mt-4 flex justify-end gap-3">
                  {isReply ? (
                    <>
                      <button
                        type="button"
                        className="p-2 text-gray-400 rounded-md bg-gray-200"
                        onClick={() => {
                          setIsReply(false);
                          setReplyMsg('');
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="p-2 text-white rounded-md bg-green_1"
                        onClick={handleAddReply}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="p-2 text-white rounded-md bg-green_1"
                      onClick={() => setIsReply(true)}
                    >
                      Add reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="p-2 bg-tl_primary text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow mt-5"
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
}
