module.exports = {
  name: 'products-catalog',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/products-catalog',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
