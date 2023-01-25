import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Moment from "moment";

export function ItemCard({ item }: { item: any }) {
  const [isShown, setIsShown] = useState(false);

  function onClick() {
    isShown === true ? setIsShown(false) : setIsShown(true);
  }

  function onClose() {
    setIsShown(false);
  }

  function calculateRemainingAmount(): number {
    let remainingAmount: number = item.price;

    item.itemPayOffs.map((itemPayOff: any) => {
      remainingAmount -= itemPayOff.amount;
    });
    return Math.round(remainingAmount * 100) / 100;
  }

  return (
    <>
      <div className="w-3/12 flex flex-col bg-white border border-gray-200 rounded-lg shadow-md">
        <img className="rounded-t-lg" src="https://picsum.photos/400/200" alt="Small picture of an item in the items list" />
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">{item.name}</h5>
            <h6 className="text-2xl font-bold text-white bg-gray-500 rounded-lg px-2 py-1">€{item.price}</h6>
          </div>
          <p className="mb-3 font-normal text-gray-700">{item.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <a
                href="#"
                className="inline-flex items-center w-max px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
                onClick={onClick}
              >
                Details
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <p className="text-gray-700">
              {item.payedBy.firstName} {item.payedBy.lastName}
            </p>
          </div>
        </div>
      </div>
      <Modal show={isShown} onClose={onClose}>
        <Modal.Header>
          <div className="flex flex-col">
            <img className="rounded-lg mr-2" src="https://picsum.photos/900/300" alt="Picture of the selected item" />
            <h1 className="text-2xl font-bold text-gray-700 mt-6 mb-2"> {item.name}</h1>
            <div className="flex flex-row items-center gap-10 text-xl text-gray-500">
              <p>
                Buy price: <span className="text-gray-700 font-bold">€{item.price}</span>
              </p>
              {item.isShared && (
                <p>
                  Remaining amount: <span className="text-gray-700 font-bold">€{calculateRemainingAmount()}</span>
                </p>
              )}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500">{item.description}</p>
            <div className="border-b-2"></div>
            <p className="text-base leading-relaxed text-gray-500">
              <span className="font-semibold">Type:</span> {item.isShared ? "Shared item" : "Individual item"}
            </p>
            {item.isShared && (
              <>
                <div className="border-b-2"></div>
                <p className="text-base leading-relaxed text-gray-500">
                  <span className="font-semibold">Is this item payed off?</span> {item.isPayedOff ? "Yes" : "No"}
                </p>
                <h4 className="uppercase text-center text-gray-500 font-semibold text-xl">Payoff table</h4>
                <div className="relative max-h-44 overflow-y-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.itemPayOffs.map((itemPayOff: any) => (
                        <tr className="bg-white border-b">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {itemPayOff.user.firstName} {itemPayOff.user.lastName}
                          </th>
                          <td className="px-6 py-4">€{itemPayOff.amount}</td>
                          <td className="px-6 py-4">{Moment(itemPayOff.createdAt as Date).format("DD-MM-YYYY")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
