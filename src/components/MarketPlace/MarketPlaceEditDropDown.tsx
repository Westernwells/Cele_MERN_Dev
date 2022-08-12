import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

type MarketPlaceEditDropDownProps = {
  editAction: (link: string) => void;
};
export default function MarketPlaceEditDropDown({
  editAction,
}: MarketPlaceEditDropDownProps) {
  const navigate = useNavigate();
  return (
    <div className="text-center z-50">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <GiftIcon
              className="ml-2 mr-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
            Edit
            {/* <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => editAction("/")}
                  >
                    1. Who?
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    // onClick={() => navigate("/keyword", { replace: false })}
                    onClick={() => editAction("keyword")}
                  >
                    2. Interests
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    // onClick={() => navigate("/occasion", { replace: false })}
                    onClick={() => editAction("occasion")}
                  >
                    3. Occasion
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    // onClick={() => navigate("/price", { replace: false })}
                    onClick={() => editAction("price")}
                  >
                    4. Price
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
const defaultElement = "svg";
function EditInactiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon<
  K extends React.ElementType = typeof defaultElement
>(props: React.ComponentProps<K>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon<
  K extends React.ElementType = typeof defaultElement
>(props: React.ComponentProps<K>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon<
  K extends React.ElementType = typeof defaultElement
>(props: React.ComponentProps<K>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon<
  K extends React.ElementType = typeof defaultElement
>(props: React.ComponentProps<K>) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}
function GiftIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      svg
      {...props}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_231_2073)">
        <path
          d="M17.5 6.125H15.9792C16.474 5.6889 16.8667 5.14927 17.1295 4.5444C17.3923 3.93953 17.5188 3.28423 17.5 2.625C17.5 2.39294 17.4078 2.17038 17.2437 2.00628C17.0796 1.84219 16.8571 1.75 16.625 1.75C16.3929 1.75 16.1704 1.84219 16.0063 2.00628C15.8422 2.17038 15.75 2.39294 15.75 2.625C15.75 4.91925 13.6754 5.71375 12.0977 5.98588C12.68 4.95342 13.0306 3.80657 13.125 2.625C13.125 1.92881 12.8484 1.26113 12.3562 0.768845C11.8639 0.276562 11.1962 0 10.5 0C9.80381 0 9.13613 0.276562 8.64384 0.768845C8.15156 1.26113 7.875 1.92881 7.875 2.625C7.96942 3.80657 8.31995 4.95342 8.90225 5.98588C7.32463 5.71375 5.25 4.91925 5.25 2.625C5.25 2.39294 5.15781 2.17038 4.99372 2.00628C4.82962 1.84219 4.60706 1.75 4.375 1.75C4.14294 1.75 3.92038 1.84219 3.75628 2.00628C3.59219 2.17038 3.5 2.39294 3.5 2.625C3.4812 3.28423 3.60769 3.93953 3.87051 4.5444C4.13332 5.14927 4.52602 5.6889 5.02075 6.125H3.5C2.57174 6.125 1.6815 6.49375 1.02513 7.15013C0.368749 7.8065 0 8.69674 0 9.625L0 10.5C0 10.9641 0.184374 11.4092 0.512563 11.7374C0.840752 12.0656 1.28587 12.25 1.75 12.25V16.625C1.75139 17.7849 2.21277 18.8969 3.03294 19.7171C3.85311 20.5372 4.9651 20.9986 6.125 21H14.875C16.0349 20.9986 17.1469 20.5372 17.9671 19.7171C18.7872 18.8969 19.2486 17.7849 19.25 16.625V12.25C19.7141 12.25 20.1592 12.0656 20.4874 11.7374C20.8156 11.4092 21 10.9641 21 10.5V9.625C21 8.69674 20.6313 7.8065 19.9749 7.15013C19.3185 6.49375 18.4283 6.125 17.5 6.125ZM10.5 1.75C10.7321 1.75 10.9546 1.84219 11.1187 2.00628C11.2828 2.17038 11.375 2.39294 11.375 2.625C11.2694 3.55497 10.9714 4.4528 10.5 5.26137C10.0286 4.4528 9.73063 3.55497 9.625 2.625C9.625 2.39294 9.71719 2.17038 9.88128 2.00628C10.0454 1.84219 10.2679 1.75 10.5 1.75ZM1.75 9.625C1.75 9.16087 1.93437 8.71575 2.26256 8.38756C2.59075 8.05937 3.03587 7.875 3.5 7.875H9.625V10.5H1.75V9.625ZM3.5 16.625V12.25H9.625V19.25H6.125C5.42881 19.25 4.76113 18.9734 4.26884 18.4812C3.77656 17.9889 3.5 17.3212 3.5 16.625ZM17.5 16.625C17.5 17.3212 17.2234 17.9889 16.7312 18.4812C16.2389 18.9734 15.5712 19.25 14.875 19.25H11.375V12.25H17.5V16.625ZM11.375 10.5V7.875H17.5C17.9641 7.875 18.4092 8.05937 18.7374 8.38756C19.0656 8.71575 19.25 9.16087 19.25 9.625V10.5H11.375Z"
          fill="#054A29"
        />
      </g>
      <defs>
        <clipPath id="clip0_231_2073">
          <rect width="21" height="21" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
