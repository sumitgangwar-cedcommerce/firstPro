const loginBaseUrl = "https://fbapi.sellernext.com/user/login?";

const url = (data) => {
  return loginBaseUrl + data;
};
const loginToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA";

const loginOption = {
  headers: { Authorization: loginToken },
};

export const loginFetch = async (data) => {
  return await fetch(url(data), loginOption).then((res) => res.json());
};

//product api data

export const productHeaders = {
  "Ced-Source-Id": 500,
  "Ced-Source-Name": "shopify",
  "Ced-Target-Id": 640,
  "Ced-Target-Name": "amazon",
  appCode:
    "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
  appTag: "amazon_sales_channel",
  Authorization:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4NzMxOTc2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNWY2NDQ4YzQxY2M2MjdhMzBjNmIyMiJ9.o0XvqNpmiAaXQgWC8LgaBrhx6Kjc6rwm0vi-aG-ezZHp3Ph1jcaBqKQq1u9PQSwiCjU6US8xiqMbN_l5JYEwmPOWWQF43Fdt8V2i_dYp2L4mj51rKn9pH7xCloNPAiqCAp7IlfdwXU2NL5cYlb8p4Ve9axRKuPaZ6FpEL49fP8zjlT5gsfR7lr5UD_iKmBH-F-R4ORgQC3vR0CfsW42XXebfTiKf5fh2qBAIrjtSPJyO0jgNxLCTppnT3ruBf3yDL7EcAOFXzUZn_G8NsOSaZp5AvMWIMDkpmBO0VvgkIqSuYOlICki6riprysfwhuwU1XAtpNwI6N571dfUTPhXsw",
};

const productPayload = {
  source: {
    marketplace: "shopify",
    shopId: "507",
  },
  target: {
    marketplace: "amazon",
    shopId: "509",
  },
}

export const productOptions = {
  headers : productHeaders,
  payload : productPayload
}

const productBaseUrl = 'https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts'

export const getRefineProducts = {
  all : `${productBaseUrl}`,
  notListed : `${productBaseUrl}?filter[cif_amazon_multi_inactive][1]=Not Listed`,
  inActive : `${productBaseUrl}?filter[items.status][1]=Inactive`,
  inComplete : `${productBaseUrl}?count=50&filter[items.status][1]=Incomplete`,
  active : `${productBaseUrl}?count=50&filter[items.status][1]=Active`,
  error : `${productBaseUrl}?&filter[cif_amazon_multi_active][1]=error`
}
