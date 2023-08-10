import { Fragment, useState, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import "./article-type-menu.css";

const articles = [
  {
    id: 1,
    name: "TechCrunch",
  },
  {
    id: 2,
    name: "Engadget",
  },
  {
    id: 3,
    name: "Bloomberg News",
  },
  {
    id: 4,
    name: "NextWeb",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ArticleTypeMenu() {
  const [selected, setSelected] = useState(articles[0])
  localStorage.setItem("articleType", selected.name)

  return (
    <Listbox value={selected} onChange= {setSelected}>
      {({ open }) => (
        <>
          <div>
            <Listbox.Button className="article-type-general">
                <span className="selected-article-text">{selected.name}</span>
                <svg
                  className="drop-down-down-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                >
                  <path
                    d="M1.5197 7.89684e-07L-3.70442e-07 1.52528L8.5 10L17 1.51671L15.4803 1.79446e-07L8.5 6.96658L1.5197 7.89684e-07Z"
                    fill="#3A4259"
                  />
                </svg>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="menu-items">
                {articles.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "hover-dropdown-selection"
                          : "default-dropdown-selection-style",
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected
                                ? "hover-dropdown-selection"
                                : "not-selected",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "selected-article" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center"
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
