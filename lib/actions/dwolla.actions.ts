"use server";

import { Client } from "dwolla-v2";

const getDwollaClient = () => {
  const environment = process.env.DWOLLA_ENV;
  const key = process.env.DWOLLA_KEY;
  const secret = process.env.DWOLLA_SECRET;

  if (
    (environment !== "sandbox" && environment !== "production") ||
    !key ||
    !secret
  ) {
    console.warn("Dwolla is not configured. Set DWOLLA_ENV, DWOLLA_KEY, and DWOLLA_SECRET.");
    return null;
  }

  return new Client({
    environment,
    key,
    secret,
  });
};

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    const dwollaClient = getDwollaClient();
    if (!dwollaClient) throw new Error("Dwolla is not configured");

    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const dwollaClient = getDwollaClient();
    if (!dwollaClient) throw new Error("Dwolla is not configured");

    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    const dwollaClient = getDwollaClient();
    if (!dwollaClient) throw new Error("Dwolla is not configured");

    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const dwollaClient = getDwollaClient();
    if (!dwollaClient) throw new Error("Dwolla is not configured");

    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};
