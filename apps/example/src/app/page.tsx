import { cookies } from "next/headers";

export default function Page() {
  async function addCookie(formData: FormData) {
    "use server";
    const data = formData as unknown as Map<string, string>;

    const cookieName = data.get("cookie_name")!;
    const cookieValue = data.get("cookie_value");

    cookies().set(cookieName, cookieValue || new Date().toISOString());
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Example</h1>
      <p>
        Use this page to set a cookie, then click{" "}
        <a
          href="/middleware-response"
          style={{ fontStyle: "italic", fontWeight: "bold", cursor: "pointer" }}
        >
          here
        </a>{" "}
        to view it returned from the middleware.
      </p>
      <form action={addCookie}>
        <input
          name="cookie_name"
          placeholder="name of the cookie *"
          style={{ marginRight: 8 }}
          required
        />
        <input
          name="cookie_value"
          placeholder="value (optional)"
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Cookie</button>
      </form>
      <br />
      <pre style={{ maxWidth: "100%", overflow: "scroll" }}>
        {JSON.stringify(cookies().getAll(), null, 2)}
      </pre>
    </div>
  );
}
