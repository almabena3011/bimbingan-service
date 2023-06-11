'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('progress_mingguan', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bimbinganId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bimbingan',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      progress_laporan: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_submitted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      startWeek: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endWeek: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('progress_mingguan');
  }
};
