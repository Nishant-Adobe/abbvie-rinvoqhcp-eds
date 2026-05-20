function createField(row) {
  const cells = [...row.children];
  let type;
  let name;
  let label;
  let options;

  if (cells.length >= 4) {
    type = cells[0]?.textContent?.trim().toLowerCase() || 'text';
    name = cells[1]?.textContent?.trim() || '';
    label = cells[2]?.textContent?.trim() || '';
    options = cells[3]?.textContent?.trim() || '';
  } else if (cells.length === 3) {
    type = cells[0]?.textContent?.trim().toLowerCase() || 'text';
    label = cells[1]?.textContent?.trim() || '';
    name = label.replace(/[^a-zA-Z0-9]/g, '').substring(0, 30) || 'field';
    options = cells[2]?.textContent?.trim() || '';
  } else {
    type = cells[0]?.textContent?.trim().toLowerCase() || 'text';
    label = cells[1]?.textContent?.trim() || '';
    name = label.replace(/[^a-zA-Z0-9]/g, '').substring(0, 30) || 'field';
    options = '';
  }

  const required = label.endsWith('*');
  const cleanLabel = required ? label.slice(0, -1).trim() : label;

  const wrapper = document.createElement('div');
  wrapper.className = `form-field form-field-${type}`;
  wrapper.dataset.name = name;

  if (type === 'submit') {
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = cleanLabel || 'Submit';
    wrapper.append(btn);
    return wrapper;
  }

  if (type === 'checkbox-group') {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = cleanLabel;
    fieldset.append(legend);

    options.split(',').forEach((opt) => {
      const optLabel = document.createElement('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.name = name;
      cb.value = opt.trim();
      optLabel.append(cb);
      optLabel.append(document.createTextNode(` ${opt.trim()}`));
      fieldset.append(optLabel);
    });

    wrapper.append(fieldset);
    return wrapper;
  }

  if (type === 'radio') {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = cleanLabel;
    fieldset.append(legend);

    options.split(',').forEach((opt) => {
      const optLabel = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = name;
      radio.value = opt.trim();
      optLabel.append(radio);
      optLabel.append(document.createTextNode(` ${opt.trim()}`));
      fieldset.append(optLabel);
    });

    wrapper.append(fieldset);
    return wrapper;
  }

  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', name);
  labelEl.textContent = cleanLabel;
  if (required) {
    const req = document.createElement('span');
    req.className = 'form-required';
    req.textContent = ' *';
    labelEl.append(req);
  }
  wrapper.append(labelEl);

  if (type === 'select') {
    const select = document.createElement('select');
    select.id = name;
    select.name = name;
    if (required) select.required = true;

    options.split(',').forEach((opt, i) => {
      const option = document.createElement('option');
      option.value = i === 0 ? '' : opt.trim();
      option.textContent = opt.trim();
      if (i === 0) option.disabled = true;
      if (i === 0) option.selected = true;
      select.append(option);
    });

    wrapper.append(select);
  } else if (type === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.id = name;
    textarea.name = name;
    if (required) textarea.required = true;
    wrapper.append(textarea);
  } else {
    const input = document.createElement('input');
    input.type = type;
    input.id = name;
    input.name = name;
    if (required) input.required = true;
    wrapper.append(input);
  }

  return wrapper;
}

export default function decorate(block) {
  const form = document.createElement('form');
  form.noValidate = false;

  const fields = [];
  [...block.children].forEach((row) => {
    const field = createField(row);
    fields.push(field);
    form.append(field);
  });

  // Progressive disclosure: hide all fields except the first (indication dropdown)
  const conditionalFields = document.createElement('div');
  conditionalFields.className = 'form-conditional-fields';
  conditionalFields.style.display = 'none';

  // Move all fields after the first into the conditional container
  const allFields = [...form.children];
  allFields.forEach((field, i) => {
    if (i > 0) conditionalFields.append(field);
  });
  form.append(conditionalFields);

  // Show conditional fields when first dropdown changes
  const firstSelect = form.querySelector('select');
  if (firstSelect) {
    firstSelect.addEventListener('change', () => {
      if (firstSelect.value) {
        conditionalFields.style.display = '';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
    } else {
      form.reportValidity();
    }
  });

  block.replaceChildren(form);
}
