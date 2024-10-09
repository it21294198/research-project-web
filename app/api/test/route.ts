import { NextResponse } from 'next/server';

// In-memory data store for demonstration (you can replace this with a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET: Fetch all users
export async function GET() {
  return NextResponse.json(users, { status: 200 });
}

// POST: Create a new user
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = { id: users.length + 1, ...body };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

// PUT: Update a user by ID
export async function PUT(request: Request) {
  const body = await request.json();
  const userId = body.id;
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users[userIndex] = { ...users[userIndex], ...body };
  return NextResponse.json(users[userIndex], { status: 200 });
}

// DELETE: Delete a user by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = Number(searchParams.get('id'));

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  return NextResponse.json(deletedUser, { status: 200 });
}
