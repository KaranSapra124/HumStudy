import { useEffect, useState } from 'react';
import Modal from '../../components/modals/Modal';

export default function ViewSupportModal({
  setIsModal,
  item,
  addReplyFunc,
  userName,
}) {
  const [modal, setModal] = useState(true);
  const [isReply, setIsReply] = useState(false);
  const [replyMsg, setReplyMsg] = useState('');

  const handleSendReply = () => {
    if (replyMsg.trim()) {
      addReplyFunc({ replyBy: 'Admin', message: replyMsg });
      setIsReply(false);
    }
  };

  useEffect(() => {
    if (!isReply) setReplyMsg('');
  }, [isReply]);

  return (
    <Modal setIsModal={setIsModal} modal={modal}>
      <h2>Support</h2>
      <div className="p-4 sm:text-base text-[.7rem] flex flex-col gap-4">
        <p className="flex items-end text-[22px]">
          {userName}
        </p>
        <div className="text-black mb-5">
          Subject: <p className="text-gray-700">{item.subject}</p>
        </div>
        <div className="text-black mb-5">
          Message: <p className="text-gray-700">{item.message}</p>
        </div>
        <hr />
        <div>
          <h4 className="text-black mb-2">Replies</h4>
          <div className="flex">
            {item.replies.length > 0 && (
              <div className="w-[15px]">
                <div className="h-full relative left-full border-0 border-l border-gray-200 w-0"></div>
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {item.replies.length > 0
                  ? item.replies.map((rep, i) => (
                      <div className="flex items-center" key={i}>
                        <div className="w-[15px] h-0 border-0 border-b border-gray-200"></div>
                        <div
                          key={i}
                          className="border border-gray-200 rounded-md p-2 relative"
                        >
                          {rep.replyBy === 'Admin' ? (
                            <p className="text-[.6rem] absolute left-[10px] top-0 -translate-y-2/4 bg-white text-green_1 px-1">
                              You
                            </p>
                          ) : (
                            <p className="text-[.6rem] absolute left-[10px] top-0 -translate-y-2/4 bg-white text-gray-400 px-1">
                              User
                            </p>
                          )}
                          <p>{rep.message}</p>
                        </div>
                      </div>
                    ))
                  : !isReply && (
                      <p className="text-gray-400 text-center py-4">No reply</p>
                    )}
              </div>
              {isReply && (
                <div className="flex items-center w-full">
                  {item.replies.length > 0 && (
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
                    className="border border-green_bg_1 p-2 rounded-md outline-none w-full mt-4"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-200 text-darkgray_1 p-2 rounded-md mt-5 hover:bg-gray-400 hover:text-gray-200 transition-all duration-300"
            onClick={() => (isReply ? setIsReply(false) : setModal(false))}
          >
            {isReply ? 'Cancel' : 'Close'}
          </button>
          <button
            type="button"
            onClick={() => (isReply ? handleSendReply() : setIsReply(true))}
            className="bg-green_1 text-primary border-2 border-primary p-2 rounded-md mt-5 hover:bg-tl_primary hover:text-white transition-all duration-300"
          >
            {isReply ? 'Send' : 'Add reply'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
