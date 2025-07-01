"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import LogoIcon from "./logoIcon";

const plans = [
  {
    name: "Premium",
    price: "1,500 USD",
    projects: "",
    priceId: "price_1P3rauKLDOtuUibtq63U7VZI",
  },
];

export default function PremiumSelector() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full">
      <div className="flex w-full">
        <RadioGroup
          name="plan"
          value={selected}
          onChange={setSelected}
          className="flex flex-1"
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full mr-10">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                defaultChecked={plan.name == "Standard"}
                className={({ active, checked }: any) =>
                  `${active
                    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-blue-300"
                    : ""
                  }
                                    ${checked
                    ? "bg-blue-800 text-white"
                    : "bg-neutral-50 dark:bg-neutral-800"
                  }
                                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-hidden`
                }
              >
                {({ checked }: any) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="div"
                            className={`pb-1  ${checked
                              ? "text-white"
                              : "text-neutral-900 dark:text-neutral-300"
                              }`}
                          >
                            <div className="flex items-center gap-3 pb-3 font-semibold text-xl">
                              <LogoIcon className="scale-90" />
                              <span>{plan.name}</span>
                            </div>
                            <span className="flex font-semibold pb-3 text-lg">
                              {plan.price}
                            </span>
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked
                              ? "text-blue-100"
                              : "text-neutral-500 dark:text-neutral-400"
                              }`}
                          >
                            <ul className="flex flex-col gap-2">
                              <li>{plan.projects}</li>
                            </ul>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
