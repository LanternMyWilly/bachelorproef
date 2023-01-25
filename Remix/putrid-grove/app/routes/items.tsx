import { json } from "react-router";
import { db } from "~/utils/db.server";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { ItemCard } from "~/components/item-card";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { ActionArgs, MetaFunction, redirect } from "@remix-run/node";
import { badRequest } from "~/utils/request.server";

export const meta: MetaFunction = () => ({
  description: "An overview of all items with their name, descripion, price and owner",
  title: "Putrid Grove | Items",
});

export const action = async ({ request }: ActionArgs) => {
  const userId = "00000000-0000-0000-0000-000000000001";

  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const priceString = form.get("price");
  const isShared = form.get("isShared") !== null ? true : false;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof priceString !== "string" ||
    typeof isShared !== "boolean"
  ) {
    console.log(name);
    console.log(description);
    console.log(priceString);
    console.log(isShared);

    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    name: validateName(name),
    description: validateDescription(description),
    price: validatePrice(priceString),
  };

  const price: number = +priceString;
  const fields = { name, description, price, isShared };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  await db.item.create({
    data: { ...fields, userId: userId, isPayedOff: false, iconPath: "default" },
  });

  return redirect(`/items`);
};

export const loader = async () => {
  const items = await db.item.findMany({
    include: { payedBy: true, itemPayOffs: { include: { user: true } } },
  });

  return json({
    items,
  });
};

function validateName(name: string) {
  if (name.length < 4) {
    return `That name is too short`;
  }
}

function validateDescription(description: string) {
  if (description.length < 20) {
    return `The provided description is too short`;
  }
}

function validatePrice(price: string) {
  if (price.length === 0) {
    return "Price can't be empty";
  }
  if (isNaN(+price)) {
    return `That's not a correct price format`;
  }
}

export default function Items() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [isShown, setIsShown] = useState(false);

  function onClick() {
    isShown === true ? setIsShown(false) : setIsShown(true);
  }

  function onClose() {
    setIsShown(false);
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-gray-700">
          <h1 className="text-5xl uppercase font-semibold mb-2">Items</h1>
        </div>
        <div className="w-full mt-10 pb-10 flex justify-center flex-wrap gap-10">
          {data.items.map((item: any) => (
            <ItemCard item={item} />
          ))}
        </div>
      </div>
      <button
        title="Add item"
        className="fixed z-10 top-20 right-8 uppercase bg-gray-600 rounded-lg py-2 px-5 flex justify-center items-center text-white text-2xl hover:bg-gray-700"
        onClick={onClick}
      >
        Add item
      </button>
      <Modal show={isShown} onClose={onClose}>
        <Modal.Header>
          <div className="uppercase">
            <h1 className="text-2xl">add item</h1>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form method="post">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                className={`block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer ${
                  actionData?.fieldErrors?.name ? "border-red-500" : undefined
                }`}
                placeholder=" "
              />
              <label
                htmlFor="name"
                className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  actionData?.fieldErrors?.name ? "text-red-500" : undefined
                }`}
              >
                item name
              </label>
              {actionData?.fieldErrors?.name && (
                <p className="mt-2 text-sm text-red-600">{actionData?.fieldErrors?.name}</p>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                name="description"
                id="description"
                rows="4"
                className={`block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer ${
                  actionData?.fieldErrors?.description ? "border-red-500" : undefined
                }`}
                placeholder=" "
              />
              <label
                htmlFor="description"
                className={`peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  actionData?.fieldErrors?.description ? "text-red-500" : undefined
                }`}
              >
                description
              </label>
              {actionData?.fieldErrors?.description && (
                <p className="mt-2 text-sm text-red-600">{actionData?.fieldErrors?.description}</p>
              )}
            </div>
            <div className="w-full mb-6 flex flex-col justify-center">
              <div className="w-full flex items-center">
                <div className={`z-0 mr-6 group`}>
                  <div className="flex">
                    <span
                      className={`inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md ${
                        actionData?.fieldErrors?.price ? "border-red-500" : undefined
                      }`}
                    >
                      €
                    </span>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      className={`rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-gray-500 focus:border-gray-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 ${
                        actionData?.fieldErrors?.price ? "border-red-50" : undefined
                      }`}
                      placeholder="price"
                    />
                  </div>
                </div>
                <div className="z-0 group">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" id="isShared" name="isShared" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    <span className="ml-3 text-sm text-gray-700">This is a shared item</span>
                  </label>
                </div>
              </div>
              {actionData?.fieldErrors?.price && (
                <p className="mt-2 text-sm text-red-600">{actionData?.fieldErrors?.price}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add item
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
