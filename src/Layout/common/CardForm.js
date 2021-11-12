import React from "react";

export default function CardForm({
  content1,
  content2,
  type1,
  type2,
  place1,
  place2,
  id1,
  id2,
}) {
  return (
    <div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          {content1}
        </label>
        <input
          type={type1}
          class="form-control"
          id={id1}
          placeholder={place1}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          {content2}
        </label>
        <textarea
          class="form-control"
          id={id2}
          rows="3"
          placeholder={place2}
        ></textarea>
      </div>
    </div>
  );
}
