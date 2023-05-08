import { UserShortData } from "@/api/UserAdapter";
import { loadUsers } from "@/api/UserApi";
import { Layout } from "@/components/layout/Layout";
import { UsersScreen } from "@/components/screens/users/Users";

type UsersProps = {
  usersData: UserShortData;
  page: number;
  search: string;
};

export default function Users({ usersData, page, search }: UsersProps) {
  return (
    <Layout
      pageTitle="Users"
      pageDescription="Find local food donors and connect with other food sharers in your community. Join our platform and help create a sustainable food system."
    >
      <UsersScreen usersData={usersData} page={page} search={search} />
    </Layout>
  );
}

type GetServerSidePropsProps = {
  query: any;
};

export async function getServerSideProps({ query }: GetServerSidePropsProps) {
  let page: number = Number(query["page"]);
  let search = query["search"];

  if (!page || page <= 0) {
    return {
      redirect: {
        destination: "/users?page=1",
        permanent: false,
      },
    };
  }

  let usersData: UserShortData;
  try {
    usersData = await loadUsers(page, search);
  } catch (e) {
    console.error(e);
    usersData = {} as UserShortData;
  }

  return {
    props: {
      page,
      usersData,
      search: search || "",
    },
  };
}
