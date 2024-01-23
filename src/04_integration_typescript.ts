interface Account {
  id: number;
  displayName: string;
  version: 1;
}

function welcome(user: Account) {
  console.log(user.id);
  console.log(user.name); // < Property 'name' does not exist on type 'Account'.ts(2339)
}
