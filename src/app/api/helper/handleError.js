import { NextResponse } from "next/server";

const handleError = (message, status = 500) => {
  return NextResponse.json({ error: message }, { status });
};

export default handleError;
